import Card from '@mui/material/Card';
import Grow from '@mui/material/Grow';

interface Props {
    images?: string[];
}

export const Gallery = ({ images }: Props) => {
    return (
        <Grow in={images && images.length > 0}>
            <Card className="image-gallery-container">
                <pup-lazy-loaded-gallery images={JSON.stringify(images || [])}>
                </pup-lazy-loaded-gallery>
            </Card>
        </Grow>

    )
}