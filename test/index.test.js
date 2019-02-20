const plugin = require('../index');
const { JSDOM } = require("jsdom");

test('It transforms html to javascript instructions', () => {
    const stream = plugin();
    stream.on('data', function (data) {
        global.document = new JSDOM().window.document;
        global.createNode = undefined;
        var code = data.toString();
        eval(code);
        const output = createNode();
        console.log(output);
        expect(output.textContent).toBe('Hello world!');
    });
    stream.write('<h1>Hello world!</h1>'); // input line 1
    stream.end();  // finish
});