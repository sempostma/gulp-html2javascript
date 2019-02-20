var Transform = require('stream').Transform;
const { parse } = require('html2javascript');

module.exports = function ({
    trimWhitespace = false,
    removeComments = false,
    nameMangling = false,
    funcName = 'createNode',
    skipEmptyTextNodes = false } = {}) {
    // Monkey patch Transform or create your own subclass,
    // implementing `_transform()` and optionally `_flush()`
    var transformStream = new Transform({ objectMode: true });
    /**
     * @param {Buffer|string} file
     * @param {string=} encoding - ignored if file contains a Buffer
     * @param {function(Error, object)} callback - Call this function (optionally with an
     *          error argument and data) when you are done processing the supplied chunk.
     */
    transformStream._transform = function (file, encoding, callback) {
        var html = file.toString();

        const output = parse(html, {
            trimWhitespace: trimWhitespace,
            removeComments: removeComments,
            nameMangling: nameMangling,
            funcName: funcName,
            skipEmptyTextNodes: skipEmptyTextNodes
        });

        const error = null;
        callback(error, output);
    };

    return transformStream;
};