import { Card } from 'semantic-ui-react';
import GalleryLoop from "../hooks/galleryLoop";
import { PrevButton, NextButton } from "../MiscStyling";
import styled from 'styled-components';
import { useEffect } from 'react';

const TripPhotoContainer = styled.div`
    width: 90%;
    max-width: 700px;
    min-width: 500px;
    position: relative;
`

const FeaturedPhoto = styled.article`
    width: 100%;

    img {
        width: 100%;
    }

    &:hover button {
        opacity: 1;
    }
`

const PhotoGallery = ({photos}) => {
    const [, setIndex, photo, prevImage, nextImage] = GalleryLoop(photos);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") {
                prevImage();
            } else if (event.key === "ArrowRight") {
                nextImage();
            }
        };

        // Attach event listener
        window.addEventListener("keydown", handleKeyDown);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <TripPhotoContainer>
            <FeaturedPhoto>
                <img src={photo} alt={photo} />
                <PrevButton onClick={prevImage}>
                    &#8249;
                </PrevButton>
                <NextButton onClick={nextImage}>
                    &#8250;
                </NextButton>
            </FeaturedPhoto>
            <Card.Group itemsPerRow={2}>
                {photos.map((photo, index)=>
                    <Card key={photo} onClick={()=>setIndex(index)}>
                        <img src={photo} alt={photo} />
                    </Card>
                )}
            </Card.Group>
        </TripPhotoContainer>
    );
}

export default PhotoGallery;
