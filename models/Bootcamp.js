const mongoose = require('mongoose');
const slugify = require('slugify');

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'description cannot be more than 500 characters']
    },
    website: String,
    jobGuarantee: Boolean
});

BootcampSchema.pre('save',function(next){
this.slug= slugify(this.name,{lower:true});
next();
})

module.exports=mongoose.model('BootcampSchema',BootcampSchema);