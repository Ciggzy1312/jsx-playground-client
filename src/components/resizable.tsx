import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {

  let resizableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [window.innerWidth * 0.25, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ['e'],
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 50],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return (
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;