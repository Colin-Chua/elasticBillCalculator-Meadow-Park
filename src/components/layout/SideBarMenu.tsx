import * as Icons from "@ant-design/icons";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSidebarContext } from "./provider/SideBarProvider";
import { splitStringToArray } from "../utils/utils";
import { Menu, MenuProps } from "antd";

export interface SideBarMenuItem {
  label?: string;
  icon?: JSX.Element | React.ReactNode;
  route?: string;
  menus?: SideBarMenuItem[];
  disabled?: boolean;
  divider?: boolean;
}

/**   This is from company one     */

interface Props {
  collapsed: boolean;
}

const SideBarItems: SideBarMenuItem[] = [
  { label: "Calculator", route: "/bill-calculator", icon: <Icons.AccountBookOutlined /> },
  { label: "Page 2 ", route: "/page2", icon: <Icons.AccountBookOutlined /> },
  { label: "Page 3 ", route: "/page3", icon: <Icons.AccountBookOutlined /> },
  {
    label: "Page 4 ",
    icon: <Icons.AccountBookOutlined />,
    menus: [
      {
        label: "Page 4.1 ",
        route: "/page4.1",
        icon: <Icons.AccountBookOutlined />,
      },

      {
        label: "Page 4.2 ",
        route: "/page4.2",
        icon: <Icons.AccountBookOutlined />,
      },

      {
        label: "Page 4.3 ",
        route: "/page4.3",
        icon: <Icons.AccountBookOutlined />,
      },
    ],
  },
];

const SidebarMenuPaths: string[] = [];
const getMenuPaths = (menus: SideBarMenuItem[], prefix?: string) => {
  _.map(menus, (menu) => {
    const { route, menus: subMenus } = menu;
    const key = `${prefix || ""}${route}`;
    if (route) SidebarMenuPaths.push(key);
    if (subMenus && !_.isEmpty(subMenus)) getMenuPaths(subMenus, key);
  });
};

getMenuPaths(SideBarItems);

const SideBarMenu: React.FC<Props> = ({ collapsed }) => {
  const router = useRouter();
  const prevOpenKeys = useRef<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    setCurrentPathOpenKeys();
  });

  useEffect(() => {
    setCurrentPathOpenKeys();
  }, [router.pathname]);

  useEffect(() => {
    if (
      !collapsed &&
      openKeys.length === 0 &&
      prevOpenKeys.current.length > 0
    ) {
      setOpenKeys(prevOpenKeys.current);
    } else if (collapsed && openKeys.length > 0) {
      prevOpenKeys.current = openKeys;
    }
  }, [collapsed]);

  const setCurrentPathOpenKeys = () => {
    let paths = splitStringToArray(router.pathname, "/");
    _.remove(paths, _.isEmpty);
    paths = _.map(paths, (path) => `/${path}`);

    const newOpenKeys: string[] = [];
    _.map(paths, (path) => {
      if (!_.includes(openKeys, path)) {
        newOpenKeys.push(path);
      }
    });
  };

  const renderMenu = (menus: SideBarMenuItem[], parentRoute?: string) => {
    const items: MenuProps["items"] = [];

    _.map(menus, (menu, index) => {
      const { label, icon, route, divider, disabled } = menu;

      if (divider) {
        items.push({ key: `divider-${index}`, type: "divider" });
      }

      const key = `${parentRoute || ""}${route}`;
      const onClick = () => {
        if (route) {
          router.push(route);
        }
      };

      if (menu.menus && menu.menus.length > 0) {
        items.push({
          key,
          label,
          disabled,
          icon,
          children: renderMenu(menu.menus, key),
        });
      } else {
        items.push({ key, label, icon, disabled, onClick });
      }
    });

    return items;
  };

  let selectedKey = "";
  const routePaths = splitStringToArray(router.pathname, "/");
  _.remove(routePaths, _.isEmpty);

  const paths: string[] = [];
  _.map(routePaths, (_path, index) => {
    const ary = Array.from(routePaths);
    const parsed = ary.splice(0, routePaths.length - index);
    paths.push(`/${_.join(parsed, "/")}`);
  });

  _.map(paths, (path) => {
    if (selectedKey) return;
    if (_.includes(SidebarMenuPaths, path)) selectedKey = path;
  });

  useEffect(() => {
    const elmnt = document.getElementById(`item-${selectedKey}`);
    if (elmnt)
      elmnt?.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
  }, [selectedKey]);

  return (
    <Menu
      className="!h-full"
      selectedKeys={[router.asPath, selectedKey]}
      openKeys={openKeys}
      mode="inline"
      onOpenChange={setOpenKeys}
      items={renderMenu(SideBarItems)}
    />
  );
};

export default SideBarMenu;
