import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "BvBuild/Build/Build.loader.js",
    dataUrl: "BvBuild/Build/Build.data",
    frameworkUrl: "BvBuild/Build/Build.framework.js",
    codeUrl: "BvBuild/Build/Build.wasm",
  });

  // We'll use a state to store the device pixel ratio.
  const [devicePixelRatio, setDevicePixelRatio] = useState(
      window.devicePixelRatio
  );

  const handleChangePixelRatio = useCallback(
      function () {
        // A function which will update the device pixel ratio of the Unity
        // Application to match the device pixel ratio of the browser.
        const updateDevicePixelRatio = function () {
          setDevicePixelRatio(window.devicePixelRatio);
        };
        // A media matcher which watches for changes in the device pixel ratio.
        const mediaMatcher = window.matchMedia(
            `screen and (resolution: ${devicePixelRatio}dppx)`
        );
        // Adding an event listener to the media matcher which will update the
        // device pixel ratio of the Unity Application when the device pixel
        // ratio changes.
        mediaMatcher.addEventListener("change", updateDevicePixelRatio);
        return function () {
          // Removing the event listener when the component unmounts.
          mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
        };
      },
      [devicePixelRatio]
  );

    // We'll round the loading progression to a whole number to represent the
    // percentage of the Unity Application that has loaded.
    const loadingPercentage = Math.round(loadingProgression * 100);

  return (
      <div className="container">
          {isLoaded === false && (
              // We'll conditionally render the loading overlay if the Unity
              // Application is not loaded.
              <div className="loading-overlay">
                  <p>Loading... ({loadingPercentage}%)</p>
              </div>
          )}
          {/*<Unity className="unity" style={{ width: 1600, height: 900 }} unityProvider={unityProvider} />*/}
      </div>
  );
}

export default App;
