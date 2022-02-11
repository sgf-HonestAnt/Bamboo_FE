import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import ImageUploading, { ImageListType } from "react-images-uploading";

type ImageUploaderProps = {
  avatar: any;
  handleChangeAvatar: any;
};
const ImageUploader = (props: ImageUploaderProps) => {
  const { avatar, handleChangeAvatar } = props;
  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    setImages(imageList as never[]);
    handleChangeAvatar(imageList[0]);
  };
  const uploadAvatar = (
    e: { preventDefault: () => void },
    clickFunction: any
  ) => {
    e.preventDefault();
    clickFunction();
  };
  const updateOrRemoveAvatar = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    clickFunction: {
      (index: number): void;
      (index: number): void;
      (arg0: any): void;
    },
    index: number
  ) => {
    e.preventDefault();
    clickFunction(index);
  };
  return (
    <div className='App'>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}>
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className='upload__image-wrapper'>
            {imageList.length < 1 && (
              <>
                <Button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={(e) => uploadAvatar(e, onImageUpload)}
                  {...dragProps}>
                  Click or drop avatar here <FaArrowAltCircleLeft />
                </Button>
                &nbsp;
              </>
            )}
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.length < 1 ? (
              <div className='image-item'>
                <img
                  src={avatar}
                  alt=''
                  className='settings-page__profile-card__profile-img'
                />
              </div>
            ) : (
              imageList.map((image, index) => (
                <div key={index} className='image-item'>
                  <img
                    src={image.dataURL}
                    alt=''
                    className='settings-page__profile-card__profile-img'
                  />
                  <div className='image-item__btn-wrapper'>
                    <button
                      onClick={(e) =>
                        updateOrRemoveAvatar(e, onImageUpdate, index)
                      }>
                      Update
                    </button>
                    <button
                      onClick={(e) =>
                        updateOrRemoveAvatar(e, onImageRemove, index)
                      }>
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
