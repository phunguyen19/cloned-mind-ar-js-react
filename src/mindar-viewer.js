/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useRef } from 'react';
//import 'aframe';
//import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const arSystem = sceneEl.systems['mindar-image-system'];
    sceneEl.addEventListener('renderstart', () => {
      arSystem.start(); // start AR
    });
    sceneEl.addEventListener('targetFound', (event) => {
      const targetIndex = event.target.attributes['data-targetIndex'].value;
      alert(`Image index ${targetIndex} found!`);
    });
    return () => {
      arSystem.stop();
    };
  }, []);

  const entities = [];

  for (let i = 0; i < 100; i++) {
    const entity = (
      <a-entity
        key={i}
        mindar-image-target={`targetIndex: ${i}`}
        data-targetIndex={`${i}`}
      >
        <a-plane
          color="blue"
          opacity="0.5"
          position="0 0 0"
          height="1"
          width="1"
          rotation="0 0 0"
        ></a-plane>
      </a-entity>
    );
    entities.push(entity);
  }

  return (
    <a-scene
      ref={sceneRef}
      mindar-image="imageTargetSrc: ./all-cards.mind.gz; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <>{entities}</>
    </a-scene>
  );
};
