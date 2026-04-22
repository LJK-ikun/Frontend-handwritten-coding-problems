function parseURL(url) {
    const u = new URL(url)
  
    const query = {}
    u.searchParams.forEach((value, key) => {
      if (query[key] !== undefined) {
        query[key] = Array.isArray(query[key]) ? [...query[key], value] : [query[key], value]
      } else {
        query[key] = value
      }
    })
  
    return {
      href: u.href,
      protocol: u.protocol,   // "https:"
      host: u.host,           // "example.com:8080"
      hostname: u.hostname,   // "example.com"
      port: u.port,           // "8080"
      pathname: u.pathname,   // "/a/b"
      search: u.search,       // "?x=1&y=2"
      hash: u.hash,           // "#top"
      query,                  // { x: "1", y: "2" }
    }
  }
  
  // 示例
  const result = parseURL('https://example.com:8080/a/b?x=1&x=2&y=3#top')
  console.log(result)