import React, {useRef} from 'react'
import ReactDOM from 'react-dom/client'

import App from "./component/App/App";

console.log("----------", document.getElementById('SlmRootContainer'))


/*ReactDOM.createRoot(document.getElementById('SlmRootContainer')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)*/


    const rootRef = useRef<any>(null);
    /*const observerRef = useRef(null);*/

    /*useEffect(() => {
        // Callback для обработки изменений в DOM
        const handleMutations = (mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.id === 'my-root') {
                            mountComponent(node);
                        }
                    });
                    mutation.removedNodes.forEach(node => {
                        if (node.id === 'my-root') {
                            unmountComponent();
                        }
                    });
                }
            }
        };

        // Инициализация MutationObserver
        observerRef.current = new MutationObserver(handleMutations);
        observerRef.current.observe(document.body, { childList: true, subtree: true });

        // Очистка
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            unmountComponent();
        };
    }, []);*/

    const mountComponent = (node:any) => {
        if (!rootRef.current) {
            rootRef.current = ReactDOM.createRoot(node);
            rootRef.current.render(

                <React.StrictMode>
                    <App />
                </React.StrictMode>,);
        }
    };

    const unmountComponent = () => {
        if (rootRef.current) {
            rootRef.current.unmount();
            rootRef.current = null;
        }
    };

    setInterval(()=>{
        unmountComponent()
        console.log("setMount")
        setTimeout(()=>{
            mountComponent(document.getElementById('SlmRootContainer'))
            console.log("mount")
        },3000)
    },10000)
