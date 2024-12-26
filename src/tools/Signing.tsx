import React, {useState} from "react";
import {Layer, Line, Stage} from "react-konva";

type LineType = {
  points: number[]
}

const Signing = () => {
  const [lines, setLines] = useState<Array<LineType>>([]);
  const isDrawing = React.useRef(false);

  return (
    <div>
      <Stage
        style={{
          border: "1px solid black",
        }}
        width={400}
        height={300}
        onMouseDown={e => {
          isDrawing.current = true;
          const pos = e.target.getStage()?.getPointerPosition();
          if (pos) {
            setLines([...lines, {points: [pos.x, pos.y]}]);
          }
        }}
        onMouseMove={(e) => {
          // no drawing - skipping
          if (!isDrawing.current) {
            return;
          }
          const stage = e.target.getStage();
          if (!stage) return;

          const point = stage.getPointerPosition();
          if (!point) return;

          const lastLine: LineType = lines[lines.length - 1];
          if (!lastLine) return;

          // add point
          lastLine.points = [
            ...lastLine.points,
            point.x,
            point.y
          ];

          // replace last
          lines.splice(lines.length - 1, 1, lastLine);
          setLines(lines.concat());
        }}
        onMouseUp={() => {
          isDrawing.current = false;
        }}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="black"
              strokeWidth={3}
              globalCompositeOperation='source-over'
            />
          ))}
        </Layer>
      </Stage>
      <a href='#' onClick={e => {
        e.preventDefault();
        setLines([])
      }}>
        clear
      </a>
    </div>
  );
}

export default Signing