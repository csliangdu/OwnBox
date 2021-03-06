import React, { Component } from 'react'
import classnames from "classnames";
import {connect} from "dva";

//antd的组件
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class TabCtrl extends Component {
    constructor(props){
        super();
        
    }

    clickHandler(item){
        this.props.changebrand(item);
        this.props.addtag(this.props.tagname, item, item);
    }

    render() {
        //全局数据中它的值
        var _filter = this.props.filter.filter((item)=>{
            return item.tagname == this.props.tagname;
        })[0];

        if (_filter) {var value = _filter.value};

        return (
            <div className="tab_ctrl_box">
                <Tabs defaultActiveKey="0" onChange={() => { }}>
                    {
                        Object.keys(this.props.data).map((item,index)=>{
                            return <TabPane tab={item} key={index}>
                                {
                                    this.props.data[item].map((item,index)=>{
                                        return <a 
                                            key={index} 
                                            href="javascript:void(0);"
                                            onClick={() => { this.clickHandler(item)}}
                                            className={classnames({ "cur": value == item})}
                                        >{item}</a>
                                    })
                                }
                            </TabPane>
                        })
                    }
                </Tabs>
            </div>
        )
    }
}

export default connect(
    ({carpicker}) => ({
        filter : carpicker.filter
    })
)(TabCtrl);