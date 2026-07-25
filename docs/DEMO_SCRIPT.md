# Aegis Interactive Demo Walkthrough Script

This script walks through the client features of the Aegis platform.

---

## Step 1: Launcher Landing Page

1. **Navigate to the Root Path** (`/`):
   - You will see the Apple/Stripe-inspired dark-first landing page.
   - Highlights include: Flare TEE secure compute status indicators, and the dynamic data-flow flowchart SVG.
2. **Launch Platform**: Click **Enter Dashboard**. You will be redirected to `/app/dashboard`.

---

## Step 2: Wallet Connectivity & Route Guarding

1. **Guarded Redirect**: Since your wallet is disconnected:
   - Try navigating to `/app/simulation` or `/app/settings`.
   - The route guard (`ProtectedRoute`) intercepts the path and redirects you back to the public `/` launcher.
2. **Establish connection**:
   - Go to `/app/dashboard`. Click **Connect Wallet** in the header or sidebar.
   - Select MetaMask or another provider connector in the popup modal.
   - Your mock address `0x9bB5...5fE4` is displayed in the profile dropdown, and the portfolio view resolves.

---

## Step 3: Interactive Command Palette

1. **Trigger Palette**: Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) or click the **Search** input block in the header.
2. **Query Commands**: Type `"Simulation"` or `"Settings"` in the search input box.
3. **Execute**: Press Enter or click **Go to Settings**. The router navigates instantly to `/app/settings` and dismisses the modal overlay.

---

## Step 4: Portfolio Simulation & APY Sliders

1. **Navigate to Simulation**: Go to `/app/simulation` or select it in the sidebar.
2. **Select Risk Model**: Toggle risk parameters (LOW, MEDIUM, HIGH). Observe simulated APY calculations and health indicators shifting dynamically.
3. **Adjust Allocation weights**: Drag the **Wrapped Flare (WFLR) Allocation** slider.
   - Set WFLR allocation above 85%.
   - A rose-colored warning panel resolves warning against concentrated volatility risks.

---

## Step 5: Secure Transaction Stepper

1. **Initiate Swap**: Navigate to `/app/execution`.
2. **Start execution**: Click **Start Secure Execution Pipeline**.
3. **Observe Steppers**:
   - Step 1 (Browser payload encryption) blinks and checks off.
   - Step 2 (TEE isolated calculations) blinks and checks off.
   - Step 3 (Attestation signature assembly) checks off.
   - The final success block resolves, showing the verified hardware attestation receipt.
