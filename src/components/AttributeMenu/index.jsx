import React from 'react';

// import './style.css';
import EffectStackMenuItem from '../EffectStackMenuItem';
import ObjAttrMenuItem from '../ObjAttrMenuItem';

const AttributeMenu = () => (
    <div className="card">
        <header className="card-header">
            <p className="card-header-title">
                Component
      </p>
        </header>
        <div className="card-content">
            <div className="content ">
                <ObjAttrMenuItem />
            </div>
            <div className="content ">
                <EffectStackMenuItem/>
            </div>
        </div>
    </div>
);

export default AttributeMenu;