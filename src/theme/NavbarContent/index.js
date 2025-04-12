import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { useNavbarItems } from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import PagefindSearch from "@site/src/components/PagefindSearch";

export default function NavbarContent() {
  const {
    navbar: { title, logo },
  } = useThemeConfig();
  const items = useNavbarItems();

  // Left items (default is logo and title)
  const leftItems = items.filter((item) => item.position !== "right");
  // Right items
  const rightItems = items.filter((item) => item.position === "right");

  return (
    <>
      <div className="navbar__items navbar__items--left">
        {logo && (
          <NavbarItem
            item={{
              type: "logo",
              position: "left",
              src: logo.src,
              alt: logo.alt,
            }}
          />
        )}
        {title && <strong>{title}</strong>}
        {leftItems.map((item, i) => (
          <NavbarItem {...item} key={`left-${i}`} />
        ))}
      </div>
      <div className="navbar__items navbar__items--right">
        <PagefindSearch />
        {rightItems.map((item, i) => (
          <NavbarItem {...item} key={`right-${i}`} />
        ))}
      </div>
    </>
  );
}
