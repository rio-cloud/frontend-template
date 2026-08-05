import ActionBarItem from '@rio-cloud/rio-uikit/ActionBarItem';
import Icon from '@rio-cloud/rio-uikit/Icon';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

const ServiceInfo = () => {
    const handleClick = () => {};

    const title = (
        <div>
            <span>
                <FormattedMessage id='intl-msg:starterTemplate.moduleName' />
            </span>
            <span className='text-color-gray margin-left-10'>{APP_VERSION}</span>
        </div>
    );

    return (
        <ActionBarItem id='serviceInfo' className='myItem'>
            <ActionBarItem.Icon>
                <Icon iconName='info-sign' />
            </ActionBarItem.Icon>
            <ActionBarItem.Popover title={title}>
                <ActionBarItem.List>
                    <ActionBarItem.ListItem iconName='hand-right' onClick={handleClick}>
                        Release notes
                    </ActionBarItem.ListItem>
                    <ActionBarItem.ListItem iconName='exclamation-sign'>
                        <Link to='/abcd'>Link</Link>
                    </ActionBarItem.ListItem>
                </ActionBarItem.List>
            </ActionBarItem.Popover>
        </ActionBarItem>
    );
};

export default ServiceInfo;
