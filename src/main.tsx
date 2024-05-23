import React from 'react'
import ReactDOM from 'react-dom/client'

import App from "./component/App/App";

    const handleMutations = (mutationsList:any) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    //@ts-ignore
                    mutation.addedNodes.forEach(node => {

                        if (node.id === 'SlmRootContainer') {

                            mountComponent(node);
                        }
                    });
                    //@ts-ignore
                    mutation.removedNodes.forEach(node => {
                        if (node.id === 'SlmRootContainer') {

                            unmountComponent();
                        }
                    });
                }
            }
        };

        const observer = new MutationObserver(handleMutations);
        observer.observe(document.body, { childList: true, subtree: true });
        //@ts-ignore
        window.addEventListener('SlmRootEvent', async (event) => {


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

    };

    mountComponent(document.getElementById('SlmRootContainer'))

