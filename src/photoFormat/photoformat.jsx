import React , { useRef, useEffect, useState } from 'react';
import by1 from './by1.png';
import by2 from './by2.png';
import by4 from './by4.png';
import styles from './photoformat.module.css';

export default function PhotoFormat() {
    const [content, setContent] = useState(null);
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({video: { width: 1920, height: 1080}})
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error(err);
        })
    }

    const takePhoto = () => {
        const width = 414;
        const height = width / (16/9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height; 

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
    }

    useEffect(() => {
        getVideo();

    }, [videoRef])

    const handleBy1Click = () => {
        setContent(
            <>
                <div className={styles.header}>
                            <h1>Smile bbgurl</h1>
                        </div>
                <div className={styles.app}>
                    <div className="camera">
                        <video ref={videoRef}></video>
                        <button onClick={takePhoto}>Smile</button>
                    </div>
                    <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                        <canvas ref={photoRef}></canvas>
                        <button>close</button>
                    </div>
                </div>
            </>
        );
    };

    const handleBy2Click = () => {
        setContent(
            <div className={styles.app}>
                <div className="camera">
                    <video ref={videoRef}></video>
                    <button>Smile</button>
                </div>
            </div>
        );
    };

    const handleBy4Click = () => {
        setContent(
            <div className={styles.app}>
                <div className="camera">
                    <video ref={videoRef}></video>
                    <button>Smile</button>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            
            {content ? (
                content
            ) : (
                <>
                    <div className={styles.header}>
                        <h1>Choose your Format</h1>
                    </div>
                    <div className={styles.pictures}>
                        <button onClick={handleBy1Click}>
                            <img src={by1} alt="one" />
                        </button>
                        <button onClick={handleBy2Click}>
                            <img src={by2} alt="two" /><br />
                        </button>
                        <button onClick={handleBy4Click}>
                            <img src={by4} alt="four" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}