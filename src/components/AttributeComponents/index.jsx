import React from 'react';

// import './style.css';
import EffectStackMenuItem from './EffectComponent';
import ObjAttrMenuItem from './ObjAttrComponent';

class AttributeMenu extends React.Component {
    constructor(props) {
        super(props);
        this.component = 'attributes';

    }

    handleClick(component) {
        this.component = component;
        console.log(this.component);
        this.forceUpdate();

    }
    render() {
        if (this.component === 'attributes') {
            return (
                <div>
                    <div class="tabs is-toggle is-fullwidth">
                        <ul>
                            <li class="is-active" onClick={(e) => this.handleClick('attributes')} >
                                <a >
                                    <span>Attributes</span>
                                </a>
                            </li>
                            <li onClick={(e) => this.handleClick('effects')} >
                                <a>
                                    <span>Effects</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                    <ObjAttrMenuItem />
                </div>
            )
        }
        else {
            return (
                <div>
                    <div class="tabs is-toggle is-fullwidth">
                        <ul>
                            <li onClick={(e) => this.handleClick('attributes')} >
                                <a >
                                    <span>Attributes</span>
                                </a>
                            </li>
                            <li class="is-active" onClick={(e) => this.handleClick('effects')} >
                                <a>
                                    <span>Effects</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                    <EffectStackMenuItem />
                </div>
            )
        }

    }



};

export default AttributeMenu;