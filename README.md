# logger :hammer_and_wrench:

## Javascript logger repo with various levels based on environment variables and colors in chrome

### Installation

```javascript
npm install @pdiddyb/logger
```

### Configuration

If you want to see all messages even traces and color logs, you will need to set an environemnt variable LOG_LEVEL to dev.

```javascript
LOG_LEVEL=dev
```

If you want to only see one color of color logs, then you need to set an environment variable LOG_COLOR=your color to see

```javascript
LOG_COLOR=cyan
```

### Usage

```javascript
import Log from @pdiddyb/logger
...
Log.trace('This is a trace which will only show if LOG_LEVEL is dev.');
Log.color('This is just like trace but you specify the color.', 'cyan');
Log.info('This is an info message and will always show');
Log.warn('This is a warning message and will always show');
Log.error('This is an error and will always show');
```

:soccer:
