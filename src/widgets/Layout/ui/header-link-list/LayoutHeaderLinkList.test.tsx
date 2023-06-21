import { fireEvent, render, screen  } from "@testing-library/react";
import { HEADER_LINKS } from "../../lib/config";
import { LayoutHeaderLinkList } from "./LayoutHeaderLinkList";
import styles from './LayoutHeaderLinkList.module.scss';

test('renders the list of links', () => {
  const handleLinkMock = jest.fn();
  const pathname = '/home';
  render(<LayoutHeaderLinkList handleLink={handleLinkMock} pathname={pathname} />);
  
  HEADER_LINKS.forEach(link => {
    expect(screen.getByText(link.text)).toBeInTheDocument();
  });
});

test('calls handleLink when link is clicked', () => {
  const handleLinkMock = jest.fn();
  const pathname = '/home';
  render(<LayoutHeaderLinkList handleLink={handleLinkMock} pathname={pathname} />);
  
  const linkEl = screen.getByText(HEADER_LINKS[0].text);
  fireEvent.click(linkEl);
  
  expect(handleLinkMock).toHaveBeenCalledWith(HEADER_LINKS[0].patch);
});

test('applies active class to active link', () => {
  const handleLinkMock = jest.fn();
  const pathname = HEADER_LINKS[1].patch;
  render(<LayoutHeaderLinkList handleLink={handleLinkMock} pathname={pathname} />);
  
  const activeLinkEl = screen.getByText(HEADER_LINKS[1].text);
  expect(activeLinkEl).toHaveClass(`${styles.link_text} ${styles.link_active}`);
});