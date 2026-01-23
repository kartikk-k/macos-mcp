import { runAppleScript } from "./runAppleScript";

export function executeJavaScript(
  js: string,
  windowIndex: number = 1,
  tabIndex: number = 1
): string {
  // Escape the JavaScript for AppleScript
  const escapedJs = js.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

  const script = `
tell application "Safari"
    tell tab ${tabIndex} of window ${windowIndex}
        do JavaScript "${escapedJs}"
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
tell application "Safari"
    tell current tab of front window
        do JavaScript "${escapedJs}"
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

export function getCurrentUrl(): string {
  return executeJavaScriptInActiveTab("window.location.href");
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

export function navigateToUrl(url: string): boolean {
  try {
    executeJavaScriptInActiveTab(`window.location.href = '${url}'; 'navigated'`);
    return true;
  } catch {
    return false;
  }
}

export function searchWeb(query: string): boolean {
  const script = `
tell application "Safari"
    activate
    search the web for "${query}"
end tell
return "success"
`;
  try {
    runAppleScript(script);
    return true;
  } catch {
    return false;
  }
}

export function showBookmarks(): boolean {
  const script = `
tell application "Safari"
    activate
    show bookmarks
end tell
return "success"
`;
  try {
    runAppleScript(script);
    return true;
  } catch {
    return false;
  }
}
