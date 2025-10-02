If the user asks you to convert a markdown file to an MDX document for a blog post, you need to do the following:

1. Convert any instance of `exegol-<container_name> /workspace # <command>` to `nontas@local$ <command>`
2. Convert any notes/warning/error block to a `<Callout title="Title" type="info">content here</Callout>`. Other available types are "warn" and "error".
3. Change the path of the images to `/images/blog/<user_input>/<image_name>.png`. Change them to ![short title](image path). Give very vague descriptions of the image, no need to guess too hard. The `user_input` will be given to you. The `image_name` will just be the numbers after `Pasted image ` (if that's the image naming scheme).
4. The code/console blocks should have a short title, add it right next to ```console title="Title".
For example:
```console title="Nmap scan"
nmap -sV -sC -oN nmap.txt 10.10.10.10
<output of nmap>
```
Give only short descriptive titles. If there are multiple things happening in the block, give a very vague title. If something very simple is happening (and very short), don't give a title.
