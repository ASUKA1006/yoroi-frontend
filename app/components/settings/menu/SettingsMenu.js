// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import SettingsMenuItem from './SettingsMenuItem';
import styles from './SettingsMenu.scss';
import { ROUTES } from '../../../routes-config';

const messages = defineMessages({
  general: {
    id: 'settings.menu.general.link.label',
    defaultMessage: '!!!General',
    description: 'Label for the "General" link in the settings menu.',
  },
  termsOfUse: {
    id: 'settings.menu.termsOfUse.link.label',
    defaultMessage: '!!!Terms of use',
    description: 'Label for the "Terms of use" link in the settings menu.',
  },
});

type Props = {
  isActiveItem: Function,
  onItemClick: Function,
};

@observer
export default class SettingsMenu extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const { onItemClick, isActiveItem } = this.props;
    return (
      <div>
        <div className={styles.component}>
          <SettingsMenuItem
            label={intl.formatMessage(messages.general)}
            onClick={() => onItemClick(ROUTES.SETTINGS.GENERAL)}
            active={isActiveItem(ROUTES.SETTINGS.GENERAL)}
            className="general"
          />

          <SettingsMenuItem
            label={intl.formatMessage(messages.termsOfUse)}
            onClick={() => onItemClick(ROUTES.SETTINGS.TERMS_OF_USE)}
            active={isActiveItem(ROUTES.SETTINGS.TERMS_OF_USE)}
            className="termsOfUse"
          />
        </div>
      </div>
    );
  }

}
