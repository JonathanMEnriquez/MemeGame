import React from 'react';
import ReactDropzone from 'react-dropzone';

const Dropzone = (props) => {
    const { text, onDrop, icon } = props;

    const iconOrEmptySpan = () => {
        if (icon) {
            return <img className="dropzone-icon" src={icon.src} alt={icon.alt} />
        } else {
            return <span></span>
        }
    }

    return (
        <ReactDropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {iconOrEmptySpan()}
                    <p className="dropzone-caption">{text}</p>
                </div>
                </section>
            )}
        </ReactDropzone>
    )
}

export default Dropzone;