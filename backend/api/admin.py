from django.contrib import admin
from .models import ChatSession
from polymorphic.admin import PolymorphicParentModelAdmin, PolymorphicChildModelAdmin
from .models import BaseFile, PDFFile, ExcelFile, PowerPointFile, AudioFile, VideoFile, ImageFile, OtherFile


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "created_at")
    search_fields = ("title", "user__username")
    list_filter = ("created_at",)
    ordering = ("-created_at",)

#### RAG models

# Register the parent model with a polymorphic admin
@admin.register(BaseFile)
class BaseFileAdmin(PolymorphicParentModelAdmin):
    """
    Admin for the polymorphic parent model (BaseFile).
    """
    base_model = BaseFile
    child_models = (PDFFile, ExcelFile, PowerPointFile, AudioFile, VideoFile, ImageFile, OtherFile)
    list_display = ['title', 'chatsession', 'created_at', 'polymorphic_ctype']
    #search_fields = ['title', 'content']

# Admin for each child model
@admin.register(PDFFile)
class PDFFileAdmin(PolymorphicChildModelAdmin):
    base_model = PDFFile
    list_display = ['title', 'chatsession', 'created_at', 'file']
    search_fields = ['title', 'content']

@admin.register(ExcelFile)
class ExcelFileAdmin(PolymorphicChildModelAdmin):
    base_model = ExcelFile
    list_display = ['title', 'chatsession', 'created_at', 'file']
    search_fields = ['title', 'content']

@admin.register(PowerPointFile)
class PowerPointFileAdmin(PolymorphicChildModelAdmin):
    base_model = PowerPointFile
    list_display = ['title', 'chatsession', 'created_at', 'file']
    search_fields = ['title', 'content']

@admin.register(AudioFile)
class AudioFileAdmin(PolymorphicChildModelAdmin):
    base_model = AudioFile
    list_display = ['title', 'chatsession', 'created_at', 'file']
    search_fields = ['title', 'content']

@admin.register(VideoFile)
class VideoFileAdmin(PolymorphicChildModelAdmin):
    base_model = VideoFile
    list_display = ['title', 'chatsession', 'created_at', 'file']
    search_fields = ['title', 'content']

@admin.register(ImageFile)
class ImageFileAdmin(PolymorphicChildModelAdmin):
    base_model = ImageFile
    list_display = ['title', 'chatsession', 'created_at', 'file']
    search_fields = ['title', 'content']

@admin.register(OtherFile)
class OtherFileAdmin(PolymorphicChildModelAdmin):
    base_model = OtherFile
    list_display = ['title', 'chatsession', 'created_at', 'file']
    search_fields = ['title', 'content']