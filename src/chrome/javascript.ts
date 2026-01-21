import { runAppleScript } from "./runAppleScript";

export function executeJavaScript(
  js: string,
  windowIndex: number = 1,
  tabIndex: number = 1
): string {
  // Escape the JavaScript for AppleScript
  const escapedJs = js.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

  const script = `
tell application "Google Chrome"
    tell tab ${tabIndex} of window ${windowIndex}
        execute javascript "${escapedJs}"
    end tell
end tell
`;
  try {
    return runAppleScript(script);
  } catch (e) {
    return `Error: ${e}`;
  }
}

export function executeJavaScriptInActiveTab(js: string): string {
  const escapedJs = js.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

  const script = `
tell application "Google Chrome"
    tell active tab of front window
        execute javascript "${escapedJs}"
    end tell
end tell
`;
  try {
    return runAppleScript(script);
  } catch (e) {
    return `Error: ${e}`;
  }
}

export function getPageSource(): string {
  return executeJavaScriptInActiveTab("document.documentElement.outerHTML");
}

export function getPageText(): string {
  return executeJavaScriptInActiveTab("document.body.innerText");
}

export function getPageTitle(): string {
  return executeJavaScriptInActiveTab("document.title");
}

export function clickElement(selector: string): string {
  return executeJavaScriptInActiveTab(
    `document.querySelector('${selector}')?.click(); 'clicked'`
  );
}

export function fillInput(selector: string, value: string): string {
  const escapedValue = value.replace(/'/g, "\\'");
  return executeJavaScriptInActiveTab(
    `var el = document.querySelector('${selector}'); if(el) { el.value = '${escapedValue}'; el.dispatchEvent(new Event('input', {bubbles: true})); 'filled'; } else { 'element not found'; }`
  );
}

export function scrollTo(x: number, y: number): string {
  return executeJavaScriptInActiveTab(`window.scrollTo(${x}, ${y}); 'scrolled'`);
}

export function scrollToBottom(): string {
  return executeJavaScriptInActiveTab(
    "window.scrollTo(0, document.body.scrollHeight); 'scrolled to bottom'"
  );
}

export function scrollToTop(): string {
  return executeJavaScriptInActiveTab("window.scrollTo(0, 0); 'scrolled to top'");
}
