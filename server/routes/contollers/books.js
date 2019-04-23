const Books = require('../../models/books');

module.exports = {
    findByID: (req, res, next) => {
        const { book_id } = req.params;
        Books.findById(book_id).exec((err, book) => {
            if (err || !book) {
                return res.status(404).json({
                    message: "Invalid Object Id",
                    error: err ? err : 'Item Not Found ',
                });
            }
            req.book = book;
            return next();
        });
    },
    list: (req, res) => {
        const { year, title, language, country, author } = req.query;
        let query = {};
        if (year || title || language || country || author) {
            query = { ...req.query };
        }
        Books.find(query, (err, books) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error, Please contact the Admin",
                    error: err,
                });
            }
            return res.status(200).json({
                status: 'success',
                data: books,
            });
        })
    },
    get: (req, res) => {
        const { book } = req;
        return res.status(200).json({
            status: 'success',
            data: book,
        });
    },
    create: (req, res) => {
        const newBook = new Books(req.body);
        newBook.save((err, book) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error, Please contact the Admin",
                    error: err,
                });
            }
            return res.status(201).json({
                status: 'success',
                data: book,
            });
        })
    },
    update: (req, res) => {
        const { book } = req;
        book.set(req.body);
        book.save((err, item) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error, Please contact the Admin",
                    error: err,
                });
            }
            return res.status(200).json({
                status: 'success',
                data: item,
            });
        })
    },
    remove: (req, res) => {
        const { book } = req;
        book.remove((err) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error, Please contact the Admin",
                    error: err,
                });
            }
            return res.status(204).json({
                status: 'success',
            });
        })
    }
}