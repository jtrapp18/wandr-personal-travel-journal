import React from 'react';
import { Card } from 'semantic-ui-react';

const PhotoGallery = ({photos}) => {
    return (
        <Card.Group>
            {photos.map(photo=>
                <Card key={photo}>
                    <img src={photo} alt={photo} />
                </Card>
            )}
        </Card.Group>
    );
}

export default PhotoGallery;
