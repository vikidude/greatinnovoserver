var path = require('path'),
    fs = require('fs'),
    formidable = require('formidable'),
    readChunk = require('read-chunk'),
    fileType = require('file-type');


    const routes = require('express').Router();

exports.fileUpload=(req,res,next)=>{

  console.log('Getting Called Here ',typeof file);

  var photos = [],
        form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname, '../../public/');
    form.on('file', function (name, file) {        
		var buffer = null,
            type = null,
            filename = '';
        buffer = readChunk.sync(file.path, 0, 262);
        type = fileType(buffer);
        // Check the file type as it must be either png,jpg or jpeg
        if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
            filename = Date.now() + '-' + file.name;
            fs.rename(file.path, path.join(__dirname, 'uploads/' + filename));
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'uploads/' + filename
            });
        } else {
            photos.push({
                status: false,
                filename: file.name,
                message: 'Invalid file type'
            });
            fs.unlink(file.path);
        }
    });
    form.on('error', function(err) {
        console.log('Error occurred during processing - ' + err);
    });
    form.on('end', function() {
        console.log('All the request fields have been processed.');
    });
    form.parse(req, function (err, fields, files) {
        res.status(200).json(photos);
    });

}


// routes.post('/',this.fileUpload);

// module.expo