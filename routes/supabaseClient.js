const express = require('express');
const router = express.Router();

const { createClient } = require('@supabase/supabase-js')
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const fetchData = async (name) => {
    const { data, error } = await supabase
        .from(name)
        .select('*');
    if (error) {
        throw error;
    }
    return data;
};

const fetchProducts = async (name, other) => {
    const { data, error } = await supabase
        .from(name)
        .select(`*,${other}(*)`);
    if (error) {
        throw error;
    }
    return data;
};

const insertsData = async (name, send) => {
    const { data, error } = await supabase
        .from(name)
        .insert(send)
    if (error) {
        throw error;
    }
    return data;
}

const upData = async (name, send) => {
    const { data, error } = await supabase
        .from(name)
        .upsert(send)
    if (error) {
        throw error;
    }
    return data;
}

const delData = async (name, col, value) => {
    const { data, error } = await supabase
        .from(name)
        .delete()
        .eq(col, value)
    if (error) {
        throw error;
    }
    return data;
}

router.get('/fetch/:table', async (req, res) => {
    const name = req.params.table;
    try {
        const data = await fetchData(name);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/fetch/other/:table', async (req, res) => {
    const name = req.params.table;
    const other = req.body.other;
    try {
        const data = await fetchProducts(name, other);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/post/:table', async (req, res) => {
    const name = req.params.table;
    const send = req.body;
    try {
        await insertsData(name, send);
        res.json({ message: "complete" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/update/:table', async (req, res) => {
    const name = req.params.table;
    const send = req.body;
    try {
        await upData(name, send);
        res.status(200).json({ message: "complete" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//ส่งสองตัว col กับ value
router.post('/delete/:table', async (req, res) => {
    const name = req.params.table;
    const { col, value } = req.body;
    try {
        await delData(name, col, value);
        res.status(200).json({ message: "delete complete" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;