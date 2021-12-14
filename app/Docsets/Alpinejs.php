<?php

namespace App\Docsets;

use Godbout\DashDocsetBuilder\Docsets\BaseDocset;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Wa72\HtmlPageDom\HtmlPageCrawler;

class Alpinejs extends BaseDocset
{
    public const CODE = 'alpinejs';
    public const NAME = 'Alpine.js';
    public const URL = 'alpinejs.dev';
    public const INDEX = 'start-here.html';
    public const PLAYGROUND = 'https://alpinejs.codewithhugo.com';
    public const ICON_16 = '../../icons/icon.png';
    public const ICON_32 = '../../icons/icon@2x.png';
    public const EXTERNAL_DOMAINS = [];


    public function grab(): bool
    {
        system(
            "echo; wget github.com/alpinejs/alpine \
                --mirror \
                --trust-server-names \
                --ignore-case \
                --page-requisites \
                --adjust-extension \
                --convert-links \
                --span-hosts \
                --domains={$this->externalDomains()} \
                --directory-prefix=storage/{$this->downloadedDirectory()} \
                -e robots=off \
                --quiet \
                --show-progress",
            $result
        );

        return $result === 0;
    }

    public function entries(string $file): Collection
    {
        $crawler = HtmlPageCrawler::create(Storage::get($file));

        $entries = collect();

        $entries = $entries->merge($this->guideEntries($crawler));
        $entries = $entries->merge($this->sectionEntries($crawler, $file));

        return $entries;
    }

    protected function guideEntries(HtmlPageCrawler $crawler)
    {
        $entries = collect();

        $crawler->filter('body > aside:first-of-type ul > li > ul > li')->each(function (HtmlPageCrawler $node) use ($entries) {
            $entries->push([
                'name' => trim($node->text()),
                'type' => 'Guide',
                'path' => $this->url() . '/' . $node->children('a')->attr('href')
            ]);
        });

        return $entries;
    }

    protected function sectionEntries(HtmlPageCrawler $crawler, string $file)
    {
        $entries = collect();

        $crawler->filter('main > div > h2')->each(function (HtmlPageCrawler $node) use ($entries, $file) {
            if ($node->children('a')->count() != 0) {
                $entries->push([
                    'name' => trim($node->text()),
                    'type' => 'Section',
                    'path' => Str::after($file . '#' . Str::slug($node->text()), $this->innerDirectory()),
                ]);
            }
        });

        return $entries;
    }

    public function format(string $file): string
    {
        $crawler = HtmlPageCrawler::create(Storage::get($file));

        $this->removeHeader($crawler);
        $this->removeLeftSidebar($crawler);
        $this->removeRightSidebar($crawler);

        $this->insertOnlineRedirection($crawler);
        $this->insertDashTableOfContents($crawler);

        return $crawler->saveHTML();
    }

    protected function removeHeader(HtmlPageCrawler $crawler)
    {
        $crawler->filter('header')->remove();
    }

    protected function removeLeftSidebar(HtmlPageCrawler $crawler)
    {
        $crawler->filter('body > aside:first-of-type')->remove();
    }

    protected function removeRightSidebar(HtmlPageCrawler $crawler)
    {
        $crawler->filter('body > aside:last-of-type')->remove();
    }

    protected function insertOnlineRedirection(HtmlPageCrawler $crawler)
    {
        $crawler->filter('html')->prepend("<!-- Online page at https://github.com/alpinejs/alpine -->");
    }

    protected function insertDashTableOfContents(HtmlPageCrawler $crawler)
    {
        $crawler->filter('head')
            ->before('<a name="//apple_ref/cpp/Section/Top" class="dashAnchor"></a>');

        $crawler->filter('h3')->each(function (HtmlPageCrawler $node) {
            $node->prepend(
                '<a id="'
                . Str::slug($node->text())
                . '" name="//apple_ref/cpp/Section/'
                . rawurlencode($node->text())
                . '" class="dashAnchor"></a>'
            );
        });
    }
}
