# Publishing Checklist for react-tiptap-editor

Use this checklist to ensure you don't miss any steps when publishing to npm.

## ✅ Pre-Publication Checklist

### Repository Setup
- [ ] Code is in a public Git repository
- [ ] Repository URL is correct in package-lib.json
- [ ] README-LIB.md is complete and accurate
- [ ] LICENSE file exists
- [ ] All sensitive information removed from code

### Package Configuration
- [ ] Package name is unique (check with `npm view react-tiptap-editor`)
- [ ] Version number is correct in package-lib.json
- [ ] Author information is accurate
- [ ] Keywords are relevant and complete
- [ ] Repository, bugs, and homepage URLs are correct
- [ ] Files array includes only necessary files
- [ ] Exports are correctly configured

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] Code passes linting (`npm run lint`)
- [ ] All tests pass (`npm test`)
- [ ] Build completes successfully (`npm run build`)
- [ ] No console.log statements in production code
- [ ] All TODO comments addressed

### Dependencies
- [ ] All runtime dependencies are in `dependencies`
- [ ] All build-time dependencies are in `devDependencies`
- [ ] React and TipTap are in `peerDependencies`
- [ ] No unnecessary dependencies included
- [ ] Dependency versions are appropriate (not too restrictive)

### Documentation
- [ ] README includes installation instructions
- [ ] API documentation is complete
- [ ] Usage examples are working and current
- [ ] Changelog is updated (if applicable)
- [ ] Migration guide exists (for major versions)

### Build Output
- [ ] dist/index.js exists (CommonJS)
- [ ] dist/index.esm.js exists (ES modules)
- [ ] dist/index.d.ts exists (TypeScript definitions)
- [ ] dist/styles.css exists (CSS styles)
- [ ] All files are properly minified
- [ ] Bundle size is reasonable

## 🚀 Publication Steps

### Step 1: Environment Setup
- [ ] npm account created at npmjs.com
- [ ] Logged in to npm (`npm login`)
- [ ] npm account verified (`npm whoami`)
- [ ] Two-factor authentication enabled (recommended)

### Step 2: Final Preparation
- [ ] Latest changes committed to Git
- [ ] Working directory is clean
- [ ] Version number updated (`npm version [patch|minor|major]`)
- [ ] Build script executed (`./build-lib.sh`)
- [ ] Package tested locally (`npm pack` + local install)

### Step 3: Testing
- [ ] Created test project in separate directory
- [ ] Installed packed version locally
- [ ] Verified imports work correctly
- [ ] Tested basic functionality
- [ ] Checked TypeScript support works

### Step 4: Publication
- [ ] Dry run completed (`npm publish --dry-run`)
- [ ] Reviewed files to be published
- [ ] Published to npm (`npm publish`)
- [ ] Verified publication (`npm view react-tiptap-editor`)
- [ ] Tested installation (`npm install react-tiptap-editor`)

### Step 5: Post-Publication
- [ ] Git tag created (`git tag v1.0.0`)
- [ ] Git tag pushed (`git push origin v1.0.0`)
- [ ] GitHub release created
- [ ] Release notes written
- [ ] Documentation site updated (if applicable)
- [ ] Social media announcement (if applicable)

## 🔧 Commands Reference

```bash
# Check package name availability
npm view react-tiptap-editor

# Login to npm
npm login

# Verify login
npm whoami

# Build the library
./build-lib.sh

# Version bump
npm version patch  # 1.0.0 -> 1.0.1

# Test locally
npm pack
cd ../test-project
npm install ../react-tiptap-editor-1.0.0.tgz

# Dry run publish
npm publish --dry-run

# Publish to npm
npm publish

# Verify publication
npm view react-tiptap-editor
```

## 🚨 Common Issues & Solutions

### Issue: Package name already exists
**Solution**: Choose a unique name or use scoped package (@yourorg/react-tiptap-editor)

### Issue: Build fails
**Solution**: 
- Check all dependencies are installed
- Verify TypeScript configuration
- Ensure all imports are correct

### Issue: Types not working after install
**Solution**:
- Verify `types` field in package.json
- Check TypeScript declaration files are built
- Ensure exports are configured correctly

### Issue: Styles not loading
**Solution**:
- Verify styles.css is in the dist folder
- Check exports configuration includes styles
- Ensure CSS is properly extracted

### Issue: Large bundle size
**Solution**:
- Review dependencies for unnecessary packages
- Ensure tree-shaking is working
- Consider splitting into multiple packages

## 📊 Success Metrics

Track these metrics after publication:

- **Downloads**: npm weekly/monthly downloads
- **Stars**: GitHub repository stars
- **Issues**: GitHub issues and responses
- **Community**: User feedback and contributions
- **Performance**: Bundle size and load times

## 🔄 Maintenance

### Regular Tasks
- [ ] Monitor for security vulnerabilities
- [ ] Update dependencies regularly
- [ ] Address user issues promptly
- [ ] Keep documentation current
- [ ] Plan feature roadmap

### Version Updates
- **Patch (1.0.x)**: Bug fixes, security updates
- **Minor (1.x.0)**: New features, non-breaking changes
- **Major (x.0.0)**: Breaking changes, major rewrites

Remember: Publishing is just the beginning. Active maintenance and community engagement are key to a successful package!