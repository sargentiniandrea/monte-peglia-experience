import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Galleria = ({ galleria }) => {
  const [index, setIndex] = useState(-1);
  const images = [];
  galleria &&
    galleria.map((img) => {
      const imgObj = new Image();
      imgObj.src = img.full_image_url;
      let obj = {
        src: img.full_image_url,
        width: imgObj.width,
        height: imgObj.height,
        alt: img.title,
      };
      return images.push(obj);
    });

  return (
    <div className='inner-container-galleria'>
      <PhotoAlbum
        layout='masonry'
        photos={images}
        columns={(containerWidth) => {
          if (containerWidth < 500) return 1;
          return 2;
        }}
        spacing={(containerWidth) => {
          if (containerWidth < 300) return 10;
        }}
        onClick={({ index }) => setIndex(index)}
      />
      <Lightbox
        slides={images}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </div>
  );
};

export default Galleria;
