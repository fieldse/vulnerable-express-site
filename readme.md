# Vulnerable Employee Portal

## Summary

An intentionally vulnerable employee portal site, written in Node.js with Express and Handlebars.

This is the frontend for the [Vulnerable REST API](https://github.com/fieldse/vulnerable-rest-api).

## Motivation

This is part of a series of hand-built practice grounds for pentesting exercises.

Having (somewhat-)realistic websites to attack is an essential part of developing web application penetration testing skills for ethical hackers.

This particular site presents a variety of vulnerabilities including template injection, a vulnerable API backend, SQL injection, IDORs, and more.

## Installation

1. Clone the repository
2. Install: `npm install`
3. Clone and install the related API backend: (https://github.com/fieldse/vulnerable-rest-api)

## Usage

1. Install and start the backend API server (see https://github.com/fieldse/vulnerable-rest-api))
2. (Optional) If desired, seed the API database with your own seed users.
3. Start the Express frontend server: `npm start`

The site will be running on [localhost:8000](http://localhost:8000)

## Maintainer

Matt Fields

- Github: https://github.com/fieldse
- email: [hello@mattfields.dev](mailto:hello@mattfields.dev)
