import { expect } from 'chai';

import { interpreter } from '../src/interpreter';


describe('builtin functions', function() {

  describe.skip('Conversion', function() {

    evaluate('date()', null);

    evaluate('date and time()', null);

    evaluate('time()', null);

    evaluate('number()', null);

    evaluate('string()', null);

    evaluate('duration()', null);

    evaluate('years and months duration()', null);

  });


  describe('Boolean', function() {

    evaluate('not(null)', null);
    evaluate('not(true)', false);
    evaluate('not(false)', true);

  });


  describe('String', function() {

    evaluate('substring("foobar",3)', 'obar');
    evaluate('substring("foobar",3,3)', 'oba');
    evaluate('substring("foobar", -2, 1)', 'a');
    evaluate('substring(null, -2, 1)', null);

    evaluate('string length("")', 0);
    evaluate('string length("123")', 3);

    evaluate('upper case("aBc4")', 'ABC4');

    evaluate('lower case("aBc4")', 'abc4');

    evaluate('substring before("foobar", "bar")', 'foo');
    evaluate('substring before("foobar", "xyz")', '');

    evaluate('substring after("foobar", "ob")', 'ar');
    evaluate('substring after("", "a")', '');

    evaluate('replace("abcd", "(ab)|(a)", "[1=$1][2=$2]")', '[1=ab][2=]cd');

    evaluate('contains("foobar", "of")', false);
    evaluate('contains("foobar", "ob")', true);

    evaluate('starts with("foobar", "fo")', true);

    evaluate('ends with("foobar", "r")', true);

    evaluate('split("John Doe", "\\s")', ['John', 'Doe']);
    evaluate('split("a;b;c;;", ";")', ['a','b','c','','']);

  });


  describe.skip('List', function() {

    evaluate('list contains()', null);

    evaluate('count()', null);

    evaluate('min()', null);

    evaluate('max()', null);

    evaluate('sum()', null);

    evaluate('mean()', null);

    evaluate('all()', null);

    evaluate('any()', null);

    evaluate('sublist()', null);

    evaluate('append()', null);

    evaluate('concatenate()', null);

    evaluate('insert before()', null);

    evaluate('remove()', null);

    evaluate('reverse()', null);

    evaluate('index of()', null);

    evaluate('union()', null);

    evaluate('distinct values()', null);

    evaluate('flatten()', null);

    evaluate('product()', null);

    evaluate('median()', null);

    evaluate('stddev()', null);

    evaluate('mode()', null);

  });


  describe('Numeric', function() {

    evaluate('decimal(1/3, 2)', .33);
    evaluate('decimal(1.5, 0)', 1);

    // TODO(nikku): according to spec
    // evaluate('decimal(1.5, 0)', 2);
    evaluate('decimal(2.5, 0)', 2);

    evaluate('floor(1.5)', 1);
    evaluate('floor(-1.5)', -2);

    evaluate('ceiling(1.5)', 2);
    evaluate('ceiling(-1.5)', -1);

    evaluate('abs( 10 )', 10);
    evaluate('abs( -10 )', 10);

    evaluate('modulo( 12, 5 )', 2);

    evaluate('sqrt( 16 )', 4);
    evaluate('sqrt( -3 )', null);

    evaluate('log( 10 )', 2.302585092994046);

    evaluate('exp( 5 )', 148.4131591025766);

    evaluate('odd( 5 )', true);
    evaluate('odd( 2 )', false);

    evaluate('even( 5 )', false);
    evaluate('even ( 2 )', true);

  });


  describe.skip('Sort', function() {

    evaluate('sort()', null);

  });


  describe('Context', function() {

    evaluate('get value({key1: "value1"}, "key1")', 'value1');

    // TODO(nikku): this should work, according to spec
    // evaluate('get entries({key1: "value1"})[key="key1"].value', 'value1');

    evaluate('get entries({key1: "value1"})', [ { key: 'key1', value: 'value1' } ]);

  });

});


// helpers ///////////////

function createEvalVerifier(options) {

  const {
    args,
    it
  } = options;

  const [
    expression,
    expectedOutput,
    context
  ] = args;

  const name = `${expression}${context ? ' { ' + Object.keys(context).join(', ') + ' }' : ''}`;

  it(name, function() {
    const output = interpreter.evaluate(expression, context || {});

    expect(output).to.eql(expectedOutput);
  });

}


function evaluate(...args) {

  return createEvalVerifier({
    it,
    args
  });
}

// eslint-disable-next-line no-unused-vars
function evaluateOnly(...args) {
  return createEvalVerifier({
    args,
    it: it.only
  });
}
