import React from 'react'
import ReactDOM from 'react-dom/client'

import App from "./component/App/App";

console.log("----------", document.getElementById('SlmRootContainer'))


/*ReactDOM.createRoot(document.getElementById('SlmRootContainer')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)*/



    /*const observerRef = useRef(null);*/


        // Callback для обработки изменений в DOM
        const handleMutations = (mutationsList:any) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    //@ts-ignore
                    mutation.addedNodes.forEach(node => {

                        if (node.id === 'SlmRootContainer') {
                            console.log("start node")
                            mountComponent(node);
                        }
                    });
                    //@ts-ignore
                    mutation.removedNodes.forEach(node => {
                        if (node.id === 'SlmRootContainer') {
                            console.log(" remove node")
                            unmountComponent();
                        }
                    });
                }
            }
        };

        // Инициализация MutationObserver
        const observer = new MutationObserver(handleMutations);
        observer.observe(document.body, { childList: true, subtree: true });
        //@ts-ignore
        window.addEventListener('SlmRootEvent', async (event) => {

            console.log('Кастомное событие поймано!');
            await unmountComponent()
            mountComponent(document.getElementById('SlmRootContainer'))

        });

        const mountComponent = (node:any) => {
        //@ts-ignore
        window.ZoomReactApp = ReactDOM.createRoot(node);
        //@ts-ignore
        window.ZoomReactApp.render(
                <React.StrictMode>
                    <App />
                </React.StrictMode>,);

    };

    const unmountComponent = async () => {

        try {
            //@ts-ignore
            window.ZoomReactApp.unmount()
        }catch (e:any){
            console.log(e)
        }

           /* rootRef.current.unmount();
            rootRef.current = null;*/

    };

    mountComponent(document.getElementById('SlmRootContainer'))
    /*setInterval(()=>{
        unmountComponent()
        console.log("unMount")
        setTimeout(()=>{
            mountComponent(document.getElementById('SlmRootContainer'))
            console.log("mount")
        },1000)
    },5000)*/
