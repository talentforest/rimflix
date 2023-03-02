import { AddCircle } from '@mui/icons-material';
import { Container } from './MyList';
import { useRef, useState } from 'react';
import useCanvas from '../hook/useCanvas';
import styled from 'styled-components';
import device from '../theme/mediaQueries';
import CanvasSetting from '../components/photocard/CanvasSetting';
import ModeBtns from '../components/photocard/ModeBtns';
import SearchModal from '../components/photocard/SearchModal';

export type mode = 'reset' | 'save' | 'draw' | 'text';

export interface ISetting {
  text: string;
  color: string;
  range: number;
}

export const CANVAS_WIDTH = 200;
export const CANVAS_HEIGHT = 280;

const PhotoCard = () => {
  const [modal, setModal] = useState(false);
  const [setting, setSetting] = useState<ISetting>({
    text: '',
    color: '#3498db',
    range: 2.5,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    mode,
    selectedMovie,
    onModeClick,
    onCanvasDoubleClick,
    onCanvasMove,
    onMouseDown,
    onMouseUp,
    onPosterChange,
  } = useCanvas({ canvasRef, setting, setModal });

  const toggleModal = () => setModal((prev) => !prev);

  return (
    <NewContainer>
      <h1>Make Photo Card</h1>
      <Desc>
        Put the image you want to make into a photo card and decorate it freely!
      </Desc>
      <PhotoBox>
        <Canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onDoubleClick={onCanvasDoubleClick}
          onMouseMove={onCanvasMove}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        ></Canvas>
        {selectedMovie.title.length === 0 ? (
          <AddPosterBtn onClick={toggleModal}>
            <AddCircle />
            <span>Add Movie Poster</span>
          </AddPosterBtn>
        ) : (
          <InfoBox>
            <h1>{selectedMovie.title}</h1>
            <AddPosterBtn onClick={toggleModal}>Reselect</AddPosterBtn>
          </InfoBox>
        )}
      </PhotoBox>
      <ModeBtns
        mode={mode}
        onModeClick={onModeClick}
        setting={setting}
        setSetting={setSetting}
      />
      <CanvasSetting setting={setting} setSetting={setSetting} />
      {modal && (
        <SearchModal
          toggleModal={toggleModal}
          onPosterChange={onPosterChange}
        />
      )}
    </NewContainer>
  );
};

const NewContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  @media ${device.desktop} {
    padding-top: 120px;
  }
`;
const Desc = styled.p`
  font-size: 14px;
  text-align: center;
  margin: 20px 10px 10px;
`;
const PhotoBox = styled.div`
  background-color: #eee;
  padding: 10px;
  height: 400px;
  width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
  border-radius: 10px;
`;
const InfoBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 5px;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  h1 {
    color: #333;
    font-size: 14px;
    font-weight: 700;
    width: fit-content;
  }
`;
const AddPosterBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.pink};
  span {
    margin-left: 6px;
    font-size: 14px;
    color: #333;
  }
  svg {
    width: 18px;
    height: 18px;
    fill: #333;
  }
`;

const Canvas = styled.canvas`
  background-color: #fff;
  border: 1px solid #aaa;
`;

export default PhotoCard;
