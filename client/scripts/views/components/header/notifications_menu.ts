import 'components/header/notifications_menu.scss';

import m from 'mithril';
import Infinite from 'mithril-infinite';
import { Popover, PopoverMenu, Button, Icon, Icons, ButtonGroup } from 'construct-ui';

import app from 'state';
import { navigateToSubpage } from 'app';

import { confirmationModalWithText } from 'views/modals/confirm_modal';
import NotificationRow from 'views/components/notification_row';
import { Notification } from 'models';
import { pluralize } from 'helpers';
import { sortNotifications } from 'helpers/notifications';

const MAX_NOTIFS = 40; // limit number of notifications shown

const NotificationButtons: m.Component<{ showingChainNotifications: boolean }> = {
  view: (vnode) => {
    const { showingChainNotifications } = vnode.attrs;
    const notifications = app.user.notifications.notifications;
    const chainEventNotifications = app.user.notifications.notifications.filter((n) => n.chainEvent);

    return m(ButtonGroup, {
      class: 'NotificationButtons',
      fluid: true,
      basic: true,
    }, [
      m(Button, {
        label: 'See all',
        onclick: () => (app.activeChainId() || app.activeCommunityId())
          ? navigateToSubpage('/notificationsList')
          : m.route.set('/notificationsList'),
      }),
      showingChainNotifications ? m(Button, {
        label: 'Mark all read',
        onclick: async (e) => {
          e.preventDefault();
          if (chainEventNotifications.length < 1) return;
          app.user.notifications.markAsRead(chainEventNotifications)?.then(() => m.redraw());
        },
      }) : m(Button, {
        label: 'Mark all read',
        onclick: (e) => {
          e.preventDefault();
          if (notifications.length < 1) return;
          app.user.notifications.markAsRead(notifications)?.then(() => m.redraw());
        },
      }),
    ]);
  }
};

const NotificationsMenu: m.Component<{ small?: boolean }, { selectedChainEvents: boolean }> = {
  view: (vnode) => {
    // TODO: Add helper directly on controller
    const { small } = vnode.attrs;
    const notifications = app.user.notifications?.notifications || [];
    const filteredNotifications = vnode.state.selectedChainEvents
      ? notifications.filter((n) => n.chainEvent)
      : notifications.filter((n) => !n.chainEvent);
    const sortedFilteredNotifications = sortNotifications(filteredNotifications).reverse();
    const unreadNotifications = notifications.filter((n) => !n.isRead);
    const unreadNotificationsCount = unreadNotifications.length;
    const unreadFilteredNotificationsCount = filteredNotifications.filter((n) => !n.isRead).length;
    const chainNotificationsCount = vnode.state.selectedChainEvents
      ? unreadFilteredNotificationsCount
      : unreadNotificationsCount - unreadFilteredNotificationsCount;
    const discussionNotificationsCount = vnode.state.selectedChainEvents
      ? unreadNotificationsCount - unreadFilteredNotificationsCount
      : unreadFilteredNotificationsCount;

    const newNotificationRedraw = () => {
      m.redraw();
    }

    const existingNotificationCallbacks = app.user.notifications.notificationCallbacks.map(x => x.name)
    if (!existingNotificationCallbacks.includes(newNotificationRedraw.bind(this).name)) {
      console.log("Adding callback")
      app.user.notifications.notificationCallbacks.push(newNotificationRedraw.bind(this));
    }

    return m(PopoverMenu, {
      hasArrow: false,
      transitionDuration: 0,
      hoverCloseDelay: 0,
      trigger: m(Button, {
        class: `NotificationsMenuButton ${unreadNotificationsCount > 0 ? 'has-notifications' : 'no-notifications'}`,
        intent: unreadNotificationsCount > 0 ? 'primary' : undefined,
        label: [
          m(Icon, { name: Icons.BELL }),
          m('.notification-count', [
            m('span.hidden-xs', unreadNotificationsCount),
            m('span.visible-xs', unreadNotificationsCount > 9 ? '∞' : unreadNotificationsCount),
          ]),
        ],
        size: small ? 'sm' : 'default',
        compact: true,
      }),
      position: 'bottom-end',
      inline: true,
      closeOnContentClick: true,
      closeOnOutsideClick: true,
      menuAttrs: {
        align: 'left',
      },
      class: 'NotificationsMenu',
      content: [
        m(ButtonGroup, {
          class: 'NotificationsTypeSelectorButtons',
          fluid: true,
          basic: true,
        }, [
          m(Button, {
            label: discussionNotificationsCount ? `Discussions (${discussionNotificationsCount})` : 'Discussions',
            active: !vnode.state.selectedChainEvents,
            onclick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              vnode.state.selectedChainEvents = false;
            }
          }),
          m(Button, {
            label: chainNotificationsCount ? `Chain events (${chainNotificationsCount})` : 'Chain events',
            active: !!vnode.state.selectedChainEvents,
            onclick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              vnode.state.selectedChainEvents = true;
            }
          }),
        ]),
        m('.notification-list', [
          sortedFilteredNotifications.length > 0
            ? m(Infinite, {
              maxPages: 1, // prevents rollover/repeat
              pageData: () => sortedFilteredNotifications.slice(0, MAX_NOTIFS), // limit the number of rows shown here
              key: (vnode.state.selectedChainEvents ? 'chain-' : 'discussion-') + sortedFilteredNotifications.length,
              item: (data, opts, index) => {
                return m(NotificationRow, { notifications: data });
              },
            })
            : m('li.no-notifications', [
              vnode.state.selectedChainEvents ? 'No chain notifications' : 'No discussion notifications'
            ]),
        ]),
        m(NotificationButtons, { showingChainNotifications: vnode.state.selectedChainEvents }),
      ]
    });
  },
};

export default NotificationsMenu;
