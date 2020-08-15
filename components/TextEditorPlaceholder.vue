<template>
  <div id="text-editor-placeholder">
    <!-- Editor loading placeholder -->
    <div class="card">
      <div class="card-header p-2">
        <div class="row">
          <div class="col-auto">
            <div class="btn-group rounded border border-secondary">
              <button class="btn btn-dark" disabled>
                <i class="fa fa-bold" aria-hidden="true"></i>
              </button>
              <button class="btn btn-dark" disabled>
                <i class="fa fa-italic" aria-hidden="true"></i>
              </button>
              <button class="btn btn-dark" disabled>
                <i class="fa fa-underline" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          <div class="col-auto pl-0">
            <div class="btn-group rounded border border-secondary">
              <button class="btn btn-dark" disabled>
                <i class="fa fa-paragraph" aria-hidden="true"></i>
              </button>
              <button class="btn btn-dark" disabled>
                H1
              </button>
              <button class="btn btn-dark" disabled>
                H2
              </button>
              <button class="btn btn-dark" disabled>
                H3
              </button>
            </div>
          </div>

          <div class="col-auto pl-0">
            <div class="btn-group rounded border border-secondary">
              <button class="btn btn-dark" disabled>
                <i class="fa fa-list-ul" aria-hidden="true"></i>
              </button>
              <button class="btn btn-dark" disabled>
                <i class="fa fa-list-ol" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          <div class="col pl-0">
            <div class="btn-group rounded border border-secondary float-right">
              <button class="btn btn-dark" disabled>
                <i class="fa fa-undo" aria-hidden="true"></i>
              </button>
              <button class="btn btn-dark" disabled>
                <i class="fas fa-redo" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="card-body p-3">
        <div class="loading gradient rounded w-50"></div>
      </div>

      <div class="card-footer p-2">
        <p class="small float-right text-muted m-0">characters: 0</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextEditorPlaceholder',
}
</script>

<style scoped>
.card-header {
  background: var(--editor-menu-bg);
}

.card-body {
  background: var(--editor-body-bg);
  color: var(--editor-text-color);
}

.card-footer {
  background: var(--editor-footer-bg);
  color: var(--editor-footer-text-color);
}
</style>
