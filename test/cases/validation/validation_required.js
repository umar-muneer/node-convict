var convict = require("../../../");
module.exports.requiredOverridden = {
    schema: convict({
        foo:{
            format:String,
            required:true,
            default:"fooo"
        },
        bar:{
            format:String,
            required:true,
            default:"baaar"
        },
        baz:{
            format:String,
            default:"baaaaz"
        }
    }),
    data: {
        foo: "fooooo",
        bar: "baaar"
    }
};

module.exports.requiredNotOverridden = {
    schema: convict({
        foo: {
            doc: '',
            format: String,
            required: true,
            default: ''
        },
        bar: {
            doc: '',
            format: String,
            required: true,
            default: ''
        },
        baz: {
            doc: '',
            format: String,
            default: 'BAZ'
        },
        nested:{
          level1:{
            format:String,
            default:null,
            required:true
          }
        }
    }),
    data: {
    	foo: "fooooo",
    	baz: "baaaaz",
      bar:"baaar"
    }
};

module.exports.noRequired = {
    schema: convict({
        foo: {
            'format': String,
            'default': "foo"
        },
        bar: {
            'format': String,
            'default': "bar"
        }
    }),
    data: {
        foo: "fooooo",
        bar: "baaaar"
    }
};
