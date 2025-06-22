const validateImage = (req, res, next) => {
  if (!req.body.image) {
    return res.status(400).json({ message: 'No image data provided' });
  }

  const base64Image = req.body.image;
  const regex = /^data:image\/(png|jpeg|jpg);base64,/;

  // Match the image type (png, jpeg, jpg)
  const match = base64Image.match(regex);
  
  if (!match) {
    return res.status(400).json({ message: 'Invalid Base64 image format' });
  }

  // Extract image type (png, jpeg, jpg)
  const imageType = match[1];
  
  // Remove the Base64 metadata (data:image/png;base64,)
  const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

  // Store the data and image type in the request object for later use
  req.base64Data = base64Data;
  req.imageType = imageType;
  next();
};
module.exports = validateImage;

