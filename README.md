# God's Love | Mudet Real Solution Stockist

## Overview

This project is a high-performance web platform designed to help customers easily purchase Mudet herbal products and sign up as a Mudet stockist or network marketer. It streamlines the entire sales and onboarding funnel with product selection, multi-tier registration packages, automatic price calculation, bank payment information copying, and direct WhatsApp order submission for quick payment verification.

## Architecture & Configuration

All stockist-specific information is centralized in a single configuration file:
👉 `src/lib/stockistConfig.ts`

To customize this website for any stockist, simply open `src/lib/stockistConfig.ts` and update:
- `name`: Stockist / Business name (e.g. God's Love)
- `tagline`: Business tagline
- `sponsorUsername`: Sponsor code for new registrations
- `phone.whatsapp`: WhatsApp number (international format without `+`)
- `phone.display`: Formatted telephone number for display
- `email`: Contact email address
- `location`: Location / City / State
- `bank.accountNumber`: Bank account number for incoming payments
- `bank.accountName`: Account name
- `bank.bankName`: Name of the financial institution

## Design System

The visual design system is powered by Tailwind CSS v4 and Google Fonts configured in `src/index.css`:
- **Display Typography**: `Outfit`
- **Body Typography**: `Plus Jakarta Sans`
- **Color Theme**: Oceanic Deep Teal (`#0b6e6b`), Radiant Amber (`#d97706`), Ice-Mist backdrop (`#f4f8f7`), and Dark Obsidian Slate (`#0b1a19`).

## Usage

### Buying Products
1. **Browse and Select:** Choose from available Mudet herbal extracts (Cinnamon, ARMOR).
2. **Choose Quantity:** Adjust quantities with instant real-time price calculations.
3. **Customer Details:** Fill out name, email, phone, and delivery address.
4. **Bank Payment:** Instant single-click copying of account number, account name, and bank.
5. **Send to WhatsApp:** Opens WhatsApp with a structured, pre-formatted order summary ready for fulfillment.
6. **Payment Status & Verification:** Upload receipt or track payment confirmation.

### Registering as a Stockist
1. **Choose a Package:** Select from startup tiers (Lunch, Ignite, Momentum, Power, Scale, Turbo, Legend).
2. **Enter Personal & Commission Banking Details:** Complete username, contact info, and bank details for earnings.
3. **Submit via WhatsApp:** Automatically attaches sponsor code and package details for immediate registration.

---

© Mudet Real Solution Ltd
