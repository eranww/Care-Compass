const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: "AVNS_1QPIdgMqzQog4nltdxU",
    host: "pg-39e2ea0a-test36636.g.aivencloud.com",
    port: 11524,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUQf8P5QG6dJLzxqMYscQx71Cu0aMwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYzYzZmEzZWYtMDc4OS00NjM0LWIzODYtNjQyMzM1OTYy
MDYzIFByb2plY3QgQ0EwHhcNMjQwNjIwMTIzOTAwWhcNMzQwNjE4MTIzOTAwWjA6
MTgwNgYDVQQDDC9jNjNmYTNlZi0wNzg5LTQ2MzQtYjM4Ni02NDIzMzU5NjIwNjMg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAI7rkzFO
lHbsYEJYHBjfe0pDbwE9Wzo07gNQnBc0EPr4WqcvfgE1QghLoGH+3GI+Kv1jRZBw
s7jO5IR4bmoBN6CBf9WRa741Zlmpw+d/82cBL1FXDKGkQimOF4FvlhM6ZVfTDffO
xtJNB+RuWArYQXaC/yHRj5kMYJm0OVIjHxp2PE6z+pprReYX1PU/TZitLgB7caWl
naD1FDo1MdhoQOu6tJ8eZxzt0+xwcj5ddeOR/C1Qr2DBIOZkiYFqnwhVvNZrTF3X
wh+rG6Tc8yiIABTdRH3TVWy5deoFXEpnNi1CiKfFbaLppmD3QzojEgyz2Iz/2Z15
BcuBVWLMonBn47EkoOAT6sGjpmXWV3bKztzzGSp3H+nSwDFju3wa0G1fRpctVvUG
ujxmAq3MNufCatJBfARw+SKDh00jC837iHBK1wt5Kw0eokiOzc3huH8kNqHU2IAM
1JpUc5AKNPJpPqxR8mcgEmUq5pg8vhLNIg4k/th6WdejSEmmwx1gZzbanQIDAQAB
oz8wPTAdBgNVHQ4EFgQU2TgTtWicGCbCtk7Fclz2CnnQYZIwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAAATwvijiPjNTCaZ
qyOt+uyfWjCy8yZJEZ5KqmXqRl3AnBzeiBlJBAhHJV45OZwax+jD0Z2TOso77Ypo
FxmGOLuz//bZXSnbclFBYUqPRlpXkF+9MAB6hZUlt0ZnvBVGFtb24eg7g06WPtRz
6hUly6dhoFamteierchXuNT4P1WdnZ4Cie/fLp99AglywteD9kYLPmeLEV9HQ/ix
azyahhu73/H9athK+o9CDv6gGIYdnf5YKVF1DcAJuCQ621R3X9W1VWCNukEWEdEt
aJLAiBeK1G7yWWjPSMFapuUe2N6xnHWDg/M8EmUYRFyg/+9hFTrv/WaNlMHdYUBO
ZcdDp/AZNgqESbwwZ4DGU8Iou4/EfZHLVY0SBzhuyS83Q8ZK9klpySx1+DdatcMv
JK1BybE/p5Tu+gMaSEMy7yKJVs6Y4fBKU2YcAnr3fh2VW4KGSmRpgM8KVT8Na8tz
9h2kBbAVBrrOjvFWaIIYdFknXhdFQ4VWoYXgrN/9ncIN7fvd7g==
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