# My NPM Package

## _A draggable container._

### Installation

```sh
npm install dragmate
```

## Features

✅ Native HTML
✅ React / Vue / Angular
✅ On-demand registration
✅ TypeScript type declarations
✅ ESM modern build
✅ Direct browser usage with

## Usage

Step 1: Import

```sh
import { defineDraggableBox } from "dragmate";
```

Step 2: Configure usage

(1): The first parameter can be customized or left empty, which defaults to drag-mate.For example, to customize as drag-test, the outer tag would be <drag-test></drag-test>.

(2): The following forms are all valid:

```sh
defineDraggableBox()
defineDraggableBox('drag-test')
defineDraggableBox('drag-test',{ COLLAPSE:{...} })
defineDraggableBox({ COLLAPSE:{...} })

# parameter configuration
 {
    # Sidebar constraint (disabled by default)
    COLLAPSE = {
      # Enable left boundary constraint
      enable: false,
      # Minimum distance from the left
      disabledLeft: 0,
    },

    # Header constraint (disabled by default)
    HEADER = {
      # Enable top boundary constraint
      enable: false,
      # Minimum distance from the top
      disabledTop: 0,
    }
  }

```

React

```
  // Sidebar status (please add your own information for useSidebarStore)
  const isOpen = useSidebarStore((state) => state.isOpen);

  useEffect(() => {
    // Register components and run them only once to save performance
    defineDraggableBox({
      COLLAPSE: {
        enable: true,
        disabledLeft: 250,
      },
      HEADER: {
        enable: true,
        disabledTop: 64,
      },
    });
    // Configuration update
    const el = document.querySelector("drag-mate");
    if (el?.updateDragOptions) {
      el.updateDragOptions({
        COLLAPSE: {
          disabledLeft: isOpen ? 80 : 250,
        },
      });
    }
    // Monitor the status of the sidebar
  }, [isOpen]);
```

Vue3

```
// Register components and run them only once to save performance
onMounted(() => {
  defineDraggableBox({
    COLLAPSE: {
      enable: true,
      disabledLeft: 250,
    },
    HEADER: {
      enable: true,
      disabledTop: 64,
    },
  });
});

// Monitor changes in sidebar status and dynamically update drag and drop configurations
watch(
  () => store.isOpen,
  (isOpen) => {
    const el = document.getElementById("box1");
    if (el?.updateDragOptions) {
      el.updateDragOptions({
        COLLAPSE: {
          disabledLeft: isOpen ? 80 : 250,
        },
      });
    }
  },
  { immediate: true } // ✅ Add this, execute immediately for the first time
);
```

Step 3: Use directly

```sh
<drag-mate>
   <span>Drag me</span>
   <div id="close">X</div>
   <div>
     <button>Click</button>
   </div>
</drag-mate>
```

# Native Usage

````
<!-- Default configuration -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>DragMate Example</title>
</head>
<body>```

<drag-mate>
   Drag me～
</drag-mate>

<script type="module">
  import { defineDraggableBox } from 'https://cdn.jsdelivr.net/npm/dragmate/dist/index.js';
  defineDraggableBox();
</script>

</body>
</html>
````
