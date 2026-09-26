import { toText } from 'src/logic-functions/utils/to-text';
import { type LinksValue } from 'src/types/links-value';
import { isDefined } from 'src/utils/is-defined';

const ALLOWED_SCHEMES = new Set(['http:', 'https:']);
const SCHEME_PREFIX_REGEX = /^[a-z][a-z0-9+.-]*:/i;

// Defense-in-depth: accept bare hosts/paths and http(s) URLs, but drop any
// explicit non-http(s) scheme (javascript:, data:, etc.) before persisting.
const hasAllowedScheme = (value: string): boolean => {
  const schemeMatch = value.match(SCHEME_PREFIX_REGEX);
  if (schemeMatch === null) {
    return true;
  }

  const remainder = value.slice(schemeMatch[0].length);
  if (!remainder.startsWith('//')) {
    // A dotted token before the colon is a host:port (e.g. "example.com:8080"),
    // not a scheme; a dot-free token is a real scheme (mailto:, javascript:).
    return schemeMatch[0].slice(0, -1).includes('.');
  }

  return ALLOWED_SCHEMES.has(schemeMatch[0].toLowerCase());
};

export const buildLinks = ({
  url,
  label,
}: {
  url: unknown;
  label?: unknown;
}): LinksValue | undefined => {
  const primaryLinkUrl = toText(url);

  if (!isDefined(primaryLinkUrl) || !hasAllowedScheme(primaryLinkUrl)) {
    return undefined;
  }

  return {
    primaryLinkUrl,
    primaryLinkLabel: toText(label) ?? '',
    secondaryLinks: null,
  };
};
