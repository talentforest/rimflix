import { MouseEvent, MutableRefObject, useState } from 'react';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  ISetting,
  mode,
} from '../routes/PhotoCard';
import { posterSizes, sizeImagePath } from '../utils/sizeImagePath';

interface ICanvasProps {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
  setting: ISetting;
  setModal: (modal: boolean) => void;
}

const useCanvas = ({ canvasRef, setting, setModal }: ICanvasProps) => {
  const [mode, setMode] = useState('draw' as mode);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({ title: '', poster: '' });
  const canvas = canvasRef.current;

  const { color, range, text } = setting;

  const onModeClick = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    mode: mode
  ) => {
    setMode(mode);
    if (mode === 'reset') {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = color;
      setSelectedMovie({ title: '', poster: '' });
      return;
    }
    if (mode === 'save') {
      let link = event.currentTarget;
      link.setAttribute('download', 'drawing/png');
      let Image = canvas?.toDataURL();
      link.setAttribute('href', Image);
    }
  };

  const onCanvasDoubleClick = (event: MouseEvent<HTMLCanvasElement>) => {
    if (text !== '') {
      const ctx = canvas.getContext('2d');
      ctx.save();
      ctx.fillStyle = color;
      ctx.lineWidth = 1;
      ctx.font = "20px 'Serif'";
      ctx.fillText(
        text,
        event.pageX - canvas.offsetLeft,
        event.pageY - canvas.offsetTop
      );
      ctx.restore();
    }
  };

  const onCanvasMove = (event: MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = range;
      ctx.strokeStyle = color;
      ctx.lineTo(
        event.pageX - canvas.offsetLeft,
        event.pageY - canvas.offsetTop
      );
      ctx.stroke();
    }
  };

  const onMouseDown = () => setIsDrawing(true);

  const onMouseUp = () => {
    const ctx = canvas?.getContext('2d');
    setIsDrawing(false);
    ctx?.beginPath();
  };

  const onPosterChange = (poster: string, title: string) => {
    setSelectedMovie({ title, poster });
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = sizeImagePath(posterSizes.w780, poster);
    image.onload = function () {
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
    setModal(false);
  };

  return {
    mode,
    selectedMovie,
    onModeClick,
    onCanvasDoubleClick,
    onCanvasMove,
    onMouseDown,
    onMouseUp,
    onPosterChange,
  };
};

export default useCanvas;
