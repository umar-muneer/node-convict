require("must");
const convict = require("../");

describe('configuration files contain properties not declared in the schema', function() {
    var config = convict({
        foo: {
            doc: 'testing',
            format: String,
            default: 'testing'
        },
        bar: {
            doc: 'testing',
            format: String,
            default: 'testing'
        },
        nested: {
            level1: {
                doc: 'testing',
                format: String,
                default: 'testing'
            },
            level2:{
                level3:{
                    doc:'testing',
                    format:String,
                    default:'testing'
                }
            }
        }
    });
    it('must not throw, if properties in config file match with the schema', function() {
        config.loadFile(__dirname + '/cases/validation/validation_correct.json');
        (function() {
            config.validate({
                strict: true
            });
        }).must.not.throw();
    });

    it('must not throw, if the option to check for non schema properties is set to false', function() {
        config.loadFile(__dirname + '/cases/validation/validation_incorrect.json');
        (function() {
            config.validate({
                strict: false
            });
        }).must.not.throw();
    });
    it('must not throw, if the option to check for non schema properties is not specified', function() {
        config.loadFile(__dirname + '/cases/validation/validation_incorrect.json');
        (function() {
            config.validate();
        }).must.not.throw();
    });
    it('must throw, if properties in config file do not match the properties declared in the schema', function() {
        config.loadFile(__dirname + '/cases/validation/validation_incorrect.json');
        (function() {
            config.validate({
                strict: true
            });
        }).must.throw();
    });
});

describe("configuration files must override required values",function(){
    var testData = require("./cases/validation/validation_required.js");
    it('must not throw, if there are no required params in the configuration',function(){
        (function(){
            testData.noRequired.schema.load(testData.noRequired.data);
        }).must.not.throw();
    });
    it('must not throw, if all required params are overridden in the configuration',function(){
        (function(){
            testData.requiredOverridden.schema.load(testData.requiredOverridden.data);
        }).must.not.throw();
    });
    it('must throw, if required params are not overridden in the configuration',function(){
        (function(){
            var loadedConfig = testData.requiredNotOverridden.schema.load(testData.requiredNotOverridden.data);
            loadedConfig.validate({
              'strict':true
            });
        }).must.throw();
    });
});
