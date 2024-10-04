import {Box, Typography} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {Text, TextField} from 'glide-design-system';
import React, {useRef, useState} from 'react';

const FileComponent = ({
  name,
  placeholder,
  value,
  onChange,
  error,
  required,
  pattern,
  validationType,
  maxLength,
  minLength,
  disabled,
  readonly,
}) => {
  const inputRef = useRef(null);
  const classes = useStyles();
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(true);
  const [post, setPost] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const enableFileUpload = () => {
    inputRef.current.click();
  };

  const handleUploadFile = e => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setPost(formData.get('file'));
    setIsImageUploaded(true);
    onChange(formData);
    // if (name && description && e.target.value !== '') setEnableSubmitBtn(false);
    // else setEnableSubmitBtn(true);
  };

  return (
    <div>
      <Text style={{textAlign: 'left', marginBottom: 8}}>
        {placeholder} {required && <span style={{color: 'red'}}>*</span>}
      </Text>
      {/* <TextField
        name={name}
        style={{width: '100%', height: '20px'}}
        pattern={pattern}
        type="file"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readonly={readonly}
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
      /> */}
      <div className={classes.fileUpload}>
        {!isImageUploaded ? (
          <Box className={classes.dragArea}>
            <Box className={classes.uploadFileInfo}>
              <span className="material-symbols-outlined">upload</span>
            </Box>
            <Box className={classes.uploadFileInfo}>
              <input
                ref={inputRef}
                type="file"
                name={name}
                //   accept="image/*"
                hidden
                onChange={handleUploadFile}
              />
              <Typography onClick={enableFileUpload}>
                Drag your attachment here or browse
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box className={classes.dragArea}>
            <Typography className={classes.imageUploaded}>
              File has been uploaded successfully
            </Typography>
            <Box className={classes.uploadFileInfo}>
              {/* <DeleteIcon
                  onClick={() => {
                    setIsImageUploaded(false);
                    setPost('');
                    setEnableSubmitBtn(true);
                  }}
                /> */}
            </Box>
          </Box>
        )}
      </div>
      {error && (
        <Text
          style={{
            color: 'red',
            textAlign: 'left',
            textTransform: 'capitalize',
            marginTop: 8,
          }}>
          {error}
        </Text>
      )}
    </div>
  );
};

export default FileComponent;

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#ffffff',
    height: '100vh',
    display: 'grid',
    placeItems: 'center',
  },
  span: {
    color: 'red',
    fontSize: '14px',
  },
  textField: {
    width: '100% !important',
    fontFamily: 'sans-serif !important',
  },
  floatingLabelFocusStyle: {
    color: '#333333 !important',
  },

  error: {
    textAlign: 'left !important',
    color: 'red !important',
    fontSize: '13px !important',
    fontFamily: 'sans-serif !important',
    marginLeft: '2px !important',
    marginTop: '2px !important',
  },
  btnParent: {
    justifyContent: 'flex-end !important',
    display: 'flex !important',
    flexDirection: 'row !important',
    paddingTop: '8px !important',
  },
  cancelBtn: {
    backgroundColor: '#f2f2f2 !important',
    '&:hover': {backgroundColor: 'rgb(219 219 219) !important'},
    color: '#2c3647 !important',
    border: '0 !important',
    boxShadow: 'none !important',
  },
  submitBtn: {
    fontFamily: 'sans-serif !important',
    color: 'rgba(242, 242, 242, 1) !important',
    boxShadow: 'none !important',
    '&:hover': {backgroundColor: 'rgba(54, 64, 83, 1) !important'},
  },
  circularProgress: {
    justifyContent: 'center !important',
    alignItems: 'center !important',
    position: 'absolute !important',
    color: 'rgb(54 64 83) !important',
  },
  muiInputbase: {
    '& .MuiInputBase-input': {
      height: '37px !important',
      paddingTop: '0 !important',
      paddingBottom: '0 !important',
    },
  },
  fileUpload: {
    // position: relative,
    display: 'flex !important',
    gap: '10px !important',
    flexDirection: 'column !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    height: '200px !important',
    // padding: "20px !important",
    borderRadius: '10px !important',
    border: '2px dashed #d7d7d7 !important',
    // color: "#444 !important",
    cursor: 'pointer !important',
    // transition: background .2s ease-in-out, border .2s ease-in-out,
  },
  uploadFileInfo: {
    justifyContent: 'center !important',
    alignItems: 'center !important',
    textAlign: 'center !important',
    color: 'rgb(0 0 0 / 60%) !important',
  },
  imageUploaded: {
    justifyContent: 'center !important',
    alignItems: 'center !important',
    textAlign: 'center !important',
    color: 'green !important',
  },
}));
