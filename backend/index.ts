const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: "AVNS_SoqB3AH5CpAdKOL9svQ",
    host: "pg-2a81234f-teambeams-1328.f.aivencloud.com",
    port: 27154,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUJHyl6XVbnDztrgqPg9tHbveGrd4wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvM2ZlZTQxODUtYzdmNS00MzNmLWE5ZjktOTRkYjVmN2Q5
OWY4IFByb2plY3QgQ0EwHhcNMjQwNjIwMTMyMDIzWhcNMzQwNjE4MTMyMDIzWjA6
MTgwNgYDVQQDDC8zZmVlNDE4NS1jN2Y1LTQzM2YtYTlmOS05NGRiNWY3ZDk5Zjgg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAPRmB4wL
1outo7sSIRwL2RHS0rw3RKnMDt0DnhWP481FJJ6KgOjnvYSlb4Simsp0wna3QJ5V
obYvyF0naFdTe8harp3/HsQFVyW6DYCdDiP6qsrrcNTXJr2I3OjO6IOEN1j+VBdt
TbhPnw5rmqR/LS8Z9AvPWUJ2NQmoTxQOEuDiE3R9NLCOcWHQoNaHwTtLHZSVYisD
7si7BXAbuRZmH1Mn7KUNQNzGCvpf2MMXTGIrH1Z6pqrF/2U8rOBQo8mVVOakw4M1
iCI17btR0lKLq693FqS1rG1wKHFY6PwqFIguUmA69x331IpihYBtX5KbAr31P8gO
IVROcUKv2sOsPItHHBLJU6Q1QZGh1gvD0ZspFO9rYpG/6ZivybJ0w7KQEx0PULF7
lzhuytJbaIUf3J7lLskUEjF5D7s2C/Zxk+aa0yiitdsJbuQX95hZJw6oKwOHD7Re
WeBlZ62aWqPoGfARVjuhx6MdnLuFCrya+ZuSUsKn/fu2JD9eqHFg+p6QBQIDAQAB
oz8wPTAdBgNVHQ4EFgQUbEX++oWfceGrUN6O7lgUHWc1hDEwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBADyhdQ4U8PM9+Iqt
GFwLXv1RYzOuQ7OY5blE+6yemjXj3uIWD81ebNsZxeXQPasWY340AQi5S4Ao+a/N
gowVuN+kDWZdTGYADzOwwjWqH2BB4NHbVpdHfoJdrACavHU0qhxxbAshx6XmrVDk
uHg8TW3yJh9WrvG65aSG5OKNjSEDfY21W0s99U9Twh9Mq6IfXgNBH5Nu9wy8HbXY
2cV4OpXIR7nfQkHRaVE5kOvKcynb9GNJALUJVpb/Ql1lZJm24ZQFkXgQ9T2f87ev
+41pt1K376dlW6iuqEN0ter3UNR2y5GKsEHlVKsZ+laSefzeTRW8jPOQo60Womlj
c70MN+HzEO4DDyYEwAfzd8YcGc/vwXl9VcWxjiDE/lHxDt7ji2BjVxCQNSXFo5S+
iWF4qkE1VU3y93oKuDLJm3jqorK1xdc7BqNR5x9NTTqGG60JLHz4KKKf3fLX2a41
puZtc5tRpCCPs1r1GhmcyPSYE8HMcxXB/kDJ+QEBRxUCP3ZAjg==
-----END CERTIFICATE-----`,
    },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err)
        throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            throw err;

        console.log(result.rows[0].version);
        client.end(function (err) {
            if (err)
                throw err;
        });
    });
});