import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export const isNative = Capacitor.isNativePlatform();

/**
 * Initializes native Android device integrations:
 * - Hides the native splash screen smoothly after the React engine renders.
 * - Styles the Android status bar to match the dark noir theme.
 * - Registers hardware back-button listener.
 */
export async function initializeNativeApp(onBackButton?: () => boolean | void) {
  if (!isNative) return;

  try {
    // Configure status bar
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#020617' });
  } catch (err) {
    console.debug('StatusBar initialization skipped:', err);
  }

  try {
    // Hide native splash screen
    await SplashScreen.hide();
  } catch (err) {
    console.debug('SplashScreen hide skipped:', err);
  }

  // Register Android hardware back button handler
  try {
    CapApp.addListener('backButton', ({ canGoBack }) => {
      if (onBackButton) {
        const handled = onBackButton();
        if (handled) return;
      }
      if (canGoBack) {
        window.history.back();
      } else {
        // App can exit or confirm exit
        CapApp.exitApp();
      }
    });
  } catch (err) {
    console.debug('BackButton listener skipped:', err);
  }
}

/**
 * Tactical haptic rumble for dice rolls, threat alarms, and critical events.
 */
export async function triggerHaptic(
  type: 'impact' | 'warning' | 'success' | 'heavy' = 'impact'
) {
  if (isNative) {
    try {
      if (type === 'impact') {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } else if (type === 'heavy') {
        await Haptics.impact({ style: ImpactStyle.Heavy });
      } else if (type === 'warning') {
        await Haptics.notification({ type: NotificationType.Warning });
      } else if (type === 'success') {
        await Haptics.notification({ type: NotificationType.Success });
      }
    } catch {
      // Fallback
    }
  } else if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    if (type === 'heavy' || type === 'warning') {
      navigator.vibrate?.([40, 60, 40]);
    } else {
      navigator.vibrate?.(25);
    }
  }
}
